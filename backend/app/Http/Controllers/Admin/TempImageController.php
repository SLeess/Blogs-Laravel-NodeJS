<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class TempImageController extends Controller
{

    /**
     * Store a newly created image in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->only(['image']),[
            'image' => 'required|image',
        ], ["image.image" => "O arquivo pode ser somente uma imagem"]);

        if($validator->fails())
            return response()->json([
                'status' => false,
                'message' => "Erro com o envio da imagem",
                "errors" => [$validator->errors()],
            ], Response::HTTP_BAD_REQUEST);


        $image = $request->file('image');

        $ext = $image->getClientOriginalExtension();
        // dd($request->getClientOriginalName());
        $imageName = md5(time()).'.'.$ext;
        $rowImage = TempImage::create(['name' => $imageName]);


        $image->move(public_path('uploads/img'), $imageName);

        return response()->json([
            "status" => true,
            "message" => "Imagem enviada com sucesso!",
            "data" => [
                "image" => $imageName,
            ],
        ], Response::HTTP_CREATED);
    }
}
