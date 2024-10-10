import React, { useState } from 'react'
import Editor from 'react-simple-wysiwyg';

const CreateBlog = () => {
  const [html, setHtml] = useState('');
  function onChange(e) {
    setHtml(e.target.value);
  }
  return (
    <div className="container mb-5">
        <div className="d-flex justify-content-between pt-5 mb-4">
            <h2 className="h3">Criar novo Blog</h2>
            <a href="/" className="btn btn-dark">Voltar</a>
        </div>
        <div className="row">
            <div className="card border-1 shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Título</label>
                        <input type="text" name="title" id="title" className='form-control' placeholder='Título do Blog'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Descrição</label>
                        <Editor name='description' value={html} onChange={onChange} containerProps={{ style: { height: '400px' } }}/>
                        {/* <textarea name="description" id="description" cols="30" rows="10" className='form-control' placeholder='Descrição completa do Blog'></textarea> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="label-control">Imagem</label>
                        <input type="file" className='form-control' name='image'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="label-control">Autor</label>
                        <input type="text" name="author" id="author"  className='form-control' placeholder='Nome do Autor'/>
                    </div>
                    <div className="mb-3">
                        <a href="#" className="btn btn-dark">Criar Blog</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CreateBlog