import React, { useState } from 'react'
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
  const [html, setHtml] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();
  
//   const notify = () => toast("Wow so easy!");

  function onChange(e) {
    setHtml(e.target.value);
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    const res = await fetch("http://localhost:8000/api/save-temp-image", {
        method : "POST",
        body : formData
    });

    const result = await res.json();

    // console.log(result);
    if(result.status == false){
        
        const errors = result.errors || []; 
        errors.forEach(error => {
            if (error.image) {
                error.image.forEach(errMsg => {
                    alert(errMsg);
                });
            }
        });
        e.target.value = null;
    }
    setImage(result.data.image)
  }

  const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
    } = useForm();

//   const onSubmit = data => console.log(data);
  const formSubmit = async (data) => { //
    const newData = {...data, "description": "'"+ html + "'", "image": image};
    // console.log(newData);
    const res = await fetch("http://localhost:8000/api/blog/", {
        method: "POST",
        headers: {
            'Content-type' : "application/json",
            'Accept' : "application/json",
        },
        body: JSON.stringify(newData),
    });
    toast("Blog adicionado com sucesso!");
    navigate('/');
    // console.log(res);
  }

//   console.log(watch("example"));

  return (
    <div className="container mb-5">
        <div className="d-flex justify-content-between pt-5 mb-4">
            <h2 className="h3">Criar novo Blog</h2>
            <a href="/" className="btn btn-dark">Voltar</a>
        </div>
        <div className="row">
            <div className="card border-1 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit(formSubmit)} action="#" method='' className="form-control">
                        <div className="mb-3">
                            <label className="form-label">Título</label>
                            <input { ...register('title', { required: true }) } type="text" name="title" id="title" className={`form-control ${errors.title ? "is-invalid" : ""}`} placeholder='Título do Blog'/>
                            {errors.title && <p className='invalid-feedback'>Esse campo é obrigatório!</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descrição Curta</label>
                            <textarea { ...register('shortDescription') } className="form-control" cols="30" rows="5" name="shortDescription" id="shortDescription" placeholder='Descrição curta do Blog'></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descrição</label>
                            <Editor  name='description' value={html} onChange={onChange} containerProps={{ style: { height: '400px' } }}/>
                            {/* <textarea name="description" id="description" cols="30" rows="10" className='form-control' placeholder='Descrição completa do Blog'></textarea> */}
                        </div>
                        <div className="mb-3">
                            <label className="label-control">Imagem</label>
                            <input type="file" onChange={handleFileChange} className='form-control' name='image'/>
                        </div>
                        <div className="mb-3">
                            <label className="label-control">Autor</label>
                            <input 
                                { ...register('author', { required: true }) } 
                                type="text" 
                                name="author" 
                                id="author"  
                                className={`form-control ${errors.author ? "is-invalid" : ""}`} 
                                placeholder='Nome do Autor'/>
                            {errors.author && <p className='invalid-feedback'>O campo de autor é obrigatório!</p>}
                        </div>
                        <button type="submit" className="btn btn-dark">Criar Blog</button>
                        {/* <button onClick={notify}>Notify!</button> */}
                    </form>
                </div>

            </div>
        </div>
        
    </div>
  )
}

export default CreateBlog