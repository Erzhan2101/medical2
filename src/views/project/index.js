import React, {useEffect, useState} from 'react';
import './style.css'
import avatar from './avatarca.jpeg'
import axios from "axios";

import {useDispatch, useSelector} from "react-redux";
import {addProject, getProjects} from "../../components/actions";
import {useFormik} from "formik";
import * as yup from 'yup'

const Project = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [image, setImage] = useState({})
    const [cName, setClassName] = useState('jsGridView');

    const dispatch = useDispatch()
    const projects = useSelector(store => store.projects)

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            startDate: '',
            expirationDate: '',
            image: ''
        },
        validationSchema: yup.object({
            title: yup.string().max(15, 'Должно быть не более 15 символов.').required('Обязательное поле'),
            author: yup.string().max(20, 'Должно быть не более 20 символов.').required('Обязательное поле'),
            startDate: yup.string().required("Выбирите дату"),
            expirationDate: yup.string().required("Выбирите дату"),
            image: yup.string().required("Выбирите файл"),
        }),
        onSubmit: data => {
            data.img = image.url
            dispatch(addProject(data))
            setIsOpen(false)
        }
    })


    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch, projects])

    const handleChange = (e) => {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        formData.append("upload_preset", "gallery")

        axios.post("https://api.cloudinary.com/v1_1/erzhan2101/upload", formData)
            .then(({data}) => setImage(data))
    }

    return (
        <>
            <div className='header'>
                <img className="avatar" src={avatar} alt=""/>
            </div>
            <div className="project">
                <h1 className="title">ПРОЕКТЫ</h1>
                <div className="flex">
                    <h3 className="desk">СПИСОК ПРОЕКТОВ</h3>
                    <button onClick={() => setIsOpen(true)} className="btn">Добавить проект</button>
                </div>
                <div className="flex-on-off">
                    <button className="view-btn list-view btn-flex" title="Grid View"
                            onClick={() => setClassName('jsGridView')}>
                        <i className='bx bx-grid-alt'/>
                    </button>
                    <button className="view-btn list-view btn-no-flex" title="List View"
                            onClick={() => setClassName('jsListView')}>
                        <i className='bx bx-menu'/>
                    </button>
                </div>
                <div className="row">
                    <div className={cName}>
                        {
                            projects.map(item =>
                                <div className="card" key={item.id}>
                                    <img className="img-card" src={item.img} alt=""/>
                                    <div className="card-title">
                                        <h4>{item.title}</h4>
                                        <p className="author"><i className='bx bxs-user'/> {item.author}</p>
                                        <p className="calendar"><i
                                            className='bx bx-calendar'/> {item.startDate}/{item.expirationDate} гг.</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                isOpen &&
                <div className="modal-window">
                    <div className="modal-content">
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="flex-modal">
                                    <button className="close-modal" onClick={() => setIsOpen(false)}>×</button>
                                    <label htmlFor='img'>Добавить фото</label>
                                    <input className="modal-input input-img"
                                           id='img'
                                           name='image'
                                           onChange={e => {
                                               handleChange(e)
                                               formik.handleChange(e)
                                           }}
                                           type="file"/>
                                    {formik.touched.image && formik.errors.image ? (<div className='text-danger'>{formik.errors.image}</div>) : null}

                                    <label htmlFor='title'>Название</label>
                                    {/*<input className="modal-input" {...register("title", {required: true})} id="title"*/}
                                    {/*       type="text" placeholder="название"/>*/}
                                    <input className="modal-input"
                                           id="title"
                                           name='title'
                                           type="text"
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           value={formik.values.title}
                                           placeholder="название"
                                    />
                                    {formik.touched.title && formik.errors.title ? (
                                        <div className='text-danger'>{formik.errors.title}</div>
                                    ) : null}

                                    <label htmlFor='author'>Автор</label>
                                    {/*<input className="modal-input" {...register("author", {required: true})} id="author"*/}
                                    {/*       type="text" placeholder="имя автора"/>*/}
                                    <input className="modal-input"
                                           id="author"
                                           name='author'
                                           type="text"
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           value={formik.values.author}
                                           placeholder="имя автора"
                                    />
                                    {formik.touched.author && formik.errors.author ? (
                                        <div className='text-danger'>{formik.errors.author}</div>
                                    ) : null}

                                    <div className="grid-date">

                                        <div>
                                            <label htmlFor='startDate'>Дата старта</label>
                                            {/*<input className="input-date" {...register("startDate", {required: true})} id="startDate" type="date"/>*/}
                                            <input className="input-date"
                                                   id="startDate"
                                                   type="date"
                                                   name='startDate'
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                   value={formik.values.startDate}
                                            />
                                            {formik.touched.startDate && formik.errors.startDate ? (
                                                <div className='text-danger'>{formik.errors.startDate}</div>
                                            ) : null}

                                        </div>

                                        <div>
                                            <label htmlFor="expirationDate">Дата окончания</label>
                                            {/*<input className="input-date " {...register("expirationDate", {required: true})} id="expirationDate" type="date"/>*/}
                                            <input className="input-date "
                                                   id="expirationDate"
                                                   type="date"
                                                   name='expirationDate'
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                   value={formik.values.expirationDate}
                                            />
                                            {formik.touched.expirationDate && formik.errors.expirationDate ? (
                                                <div className='text-danger'>{formik.errors.expirationDate}</div>
                                            ) : null}

                                        </div>

                                    </div>
                                    <button className="btn-add">Добавить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Project;