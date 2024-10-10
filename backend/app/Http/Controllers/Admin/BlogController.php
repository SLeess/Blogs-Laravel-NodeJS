<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Test\Constraint\ResponseIsRedirected;

class BlogController extends Controller
{
    /**
     * Display a listing of the blogs.
     */
    public function index(Request $request)
    {
        $perPage = $request->query('perPage') ?? null;

        if(!is_numeric($perPage)&& ($perPage != null))
            return response()->json([
                'status' => false,
                'message' => "Erro quanto ao filtro de pagina inserido",
                "error" => "perPage is not int, it's String!",
            ], Response::HTTP_BAD_REQUEST);

        // $perPage = (int) $perPage;

        $blogs = ($perPage != null) ?
                DB::table('blogs')->simplePaginate((int) $perPage) :
                DB::table('blogs')->simplePaginate(Blog::count());

        return response()->json([
            "status" => true,
            "message" => "Sucesso na busca pelos dados no banco.",
            "data" => [$blogs],
        ], Response::HTTP_OK);

    }

    /**
     * Store a newly created a blog in storage.
     */
    public function store(Request $request)
    {
        $validacao = Validator::make($request->all(),
            [
                'title' => [
                    "required",
                    "min:5",
                    // "unique",
                    Rule::unique('blogs'),//->ignore($id),
                ],
                'shortDescription' => 'max:255',
                'description' => '',
                'image' => '',
                'author' => 'required|min:3',
            ]
        );

        if($validacao->fails()){
            return response()->json([
                'status' => false,
                'message' => "Favor arrumar os erros de validação",
                "error" => $validacao->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        $data = $request->only(['title', 'description', 'shortDescription', 'image', 'author']);
        $blog = Blog::create($data);

        return response()->json([
            "status" => true,
            "message" => "Blog cadastrado com sucesso: '$request->title'!",
            "data" => $blog
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified blog.
     */
    public function show(string $id)
    {
        if(!$blog = Blog::find($id))
            return response()->json([
                "status" => false,
                "message" => "Item with ID: $id was not found",
            ], Response::HTTP_NOT_FOUND);

        return response()->json([
            "status" => true,
            "message" => "The item has been found",
            "data" => [$blog],
        ], Response::HTTP_FOUND);
    }

    /**
     * Update the specified blog in storage.
     */
    public function update(Request $request, string $id)
    {
        if(!$blog = Blog::find($id))
            return response()->json([
                "status" => false,
                "message" => "Item with ID: $id was not found",
            ], Response::HTTP_NOT_FOUND);

        $validacao = Validator::make($request->all(), [
            "author" => "required|min:3",
            "description" => "",
            "shortDescription" => "max:255",
            "image" => "",
            "title" => [
                "required",
                "min:5",
                Rule::unique("blogs")->ignore($id),
            ],
        ]);

        if($validacao->fails())
            return response()->json([
                "status" => false,
                "message" => "Invalid items sent to update API",
                "errors" => [$validacao->errors()],
            ],
        Response::HTTP_BAD_REQUEST);
        // Blog::update();
        $blog->update($request->only(["author", "description", "shorDescription", "image", "title"]));

        return response()->json([
            "status" => true,
            "message" => "The content has been updated with success",
            "data" => [$blog]
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified blog from storage.
     */
    public function destroy(string $id)
    {
        if(!$blog = Blog::find($id))
            return response()->json([
                "status" => false,
                "message" => "Item with ID: $id was not found",
            ], Response::HTTP_NOT_FOUND);

        $blog->delete();

        return response()->json([
            "status" => true,
            "message" => "The specific ID item was deleted",
        ], Response::HTTP_OK);
    }
}
