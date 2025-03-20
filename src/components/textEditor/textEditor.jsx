'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import {SuccessAlert} from "../../components/alerts/successAlert"
import {ErrorAlert} from "../../components/alerts/errorAlert"
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import textEditorStyle from "./textEditorStyle.css"
import SimplePopup from "../uploadImageButton/uploadImageButton"
const Tiptap = () => {

  // 
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState({
    nature: false,
    tech: false,
    health: false,
    gaming: false,
    food: false,
    sports: false,
    other: false
  });

  const handleCheckBoxChange = (event) => { 
    const {name, checked} = event.target; 
    setCategories(prev => ({ 
      ...prev,
      [name]: checked
    }))
  }

  const handleBlogSubmit = (event) => { 
    event.preventDefault(); 

    axios.post('/api/dashboardform', {
      title: title,
      content: content,
      image: image, 
      nature: categories.nature,
      tech: categories.tech,
      health: categories.health,
      gaming: categories.gaming,
      food: categories.food,
      sports: categories.sports,
      other: categories.other
    })
    .then(function (response) { 
      setTitle("")
      editor?.commands.setContent(""); 
      setImage("")
      response.data;
      setShowSuccessAlert(true)
    })
    .catch(function(error) { 
      console.error("error sending data", error)
      setError(error?.response?.data?.message || error.message || 'Something went wrong');
      setShowErrorAlert(true);
    })

    // This timeout willl hide the state of the success alret after some time
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 6000)

    setTimeout(() => {
      setShowErrorAlert(false)
    }, 6000)

  }

  const editor = useEditor({
    extensions: [
      StarterKit, 
      BulletList, 
      ListItem, 
      Dropcursor,
      Underline,
      Image.extend({
        addAttributes() {
          return {
            src: { default: null },
            width: { default: '90%' },  // Ensures full width
            height: { default: 'auto' }, // Maintains aspect ratio
          }
        }
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Write your blog content here....</p>',
    onUpdate: ({editor}) => { 
      setContent(editor.getHTML());
    }
  })

  const addImage = useCallback(() => {
    const url = window.prompt('Enter Image URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) return null

  return (
    <>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {showSuccessAlert && <SuccessAlert/>}
      {showErrorAlert && <ErrorAlert errorHere={error}/>} 
      {/* <SuccessAlert/> */}
    </div>
   
    <form onSubmit={handleBlogSubmit} style={{maxWidth: '700px', margin: '90px auto', padding: '10px', border: '2px solid #ccc', borderRadius: '8px'}}>
      {/* Toolbar */}

      <div className='checkBoxes-posts'>
        <div>
          <FormControlLabel style={{color:'var(--darkerGrey)'}} control={<Checkbox name='nature' checked={categories.nature} onChange={handleCheckBoxChange}  style={{color: 'var(--kindaLightBlue)'}}/>} label="nature" />
          <FormControlLabel style={{color:'var(--darkerGrey)'}} control={<Checkbox name='tech'  checked={categories.tech} onChange={handleCheckBoxChange}  style={{color: 'var(--kindaLightBlue)'}}/>} label="tech" />
          <FormControlLabel style={{color:'var(--darkerGrey)'}} control={<Checkbox name='health' checked={categories.health} onChange={handleCheckBoxChange}  style={{color: 'var(--kindaLightBlue)'}}/>} label="health" />
          <FormControlLabel style={{color:'var(--darkerGrey)'}} control={<Checkbox name='gaming' checked={categories.gaming} onChange={handleCheckBoxChange}  style={{color: 'var(--kindaLightBlue)'}}/>} label="gaming" />
          <FormControlLabel style={{color:'var(--darkerGrey)'}} control={<Checkbox name='food' checked={categories.food} onChange={handleCheckBoxChange} style={{color: 'var(--kindaLightBlue)'}}/>} label="food" />
          <FormControlLabel style={{color:'var(--darkerGrey)'}} control={<Checkbox name='sports' checked={categories.sports} onChange={handleCheckBoxChange} style={{color: 'var(--kindaLightBlue)'}}/>} label="sports" />
          <FormControlLabel style={{color:'var(--darkerGrey)'}} control={<Checkbox name='other' checked={categories.other} onChange={handleCheckBoxChange}  style={{color: 'var(--kindaLightBlue)'}}/>} label="other" />
          </div>
           {/* Upload Blog Image Button */}
            <SimplePopup
              theValue={image}
              setImageLink={setImage}
            />
        <div style={{border: 'solid 2px var(--lightBlue)', width: '100%', marginTop: '10px'}}></div>

      </div>

      {/* This code is the title section */}
      <input placeholder='Enter Your Blog Title Here' style={{
        padding: '50px 10px',
        textAlign: 'center', 
        color: 'var(--blacky)',
        outline: 'none',
        border: 'none', 
        fontWeight: 'bold',
        width: '100%',
        fontSize: '20px',
        backgroundColor: 'transparent'
      }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        required
      ></input>
      {/* This code is the title section */}

      <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {/* Headings */}
        {[1, 2, 3].map(level => (
          <button type='button'
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            style={{
              padding: '5px 10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              background: editor.isActive('heading', { level }) ? '#ddd' : 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            H{level}
          </button>
        ))}

        {/* Formatting */}
        {[
          { cmd: 'toggleBold', label: 'B', style: { fontWeight: 'bold' } },
          { cmd: 'toggleItalic', label: 'I', style: { fontStyle: 'italic' } },
          { cmd: 'toggleUnderline', label: 'U', style: { textDecoration: 'underline' } },
          { cmd: 'toggleBulletList', label: '•', style: { fontStyle: 'italic' } },
        ].map(({ cmd, label, style }) => (
          <button type='button'
            key={cmd}
            onClick={() => editor.chain().focus()[cmd]().run()}
            style={{
              padding: '5px 10px',
              cursor: 'pointer',
              ...style,
              background: editor.isActive(cmd.replace('toggle', '').toLowerCase()) ? '#ddd' : 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            {label}
          </button>
        ))}

        {/* Text Alignment */}
        {[
          { align: 'left', label: 'Left' },
          { align: 'center', label: 'Center' },
          { align: 'right', label: 'Right' },
          { align: 'justify', label: 'Justify' },
        ].map(({ align, label }) => (
          <button type='button'
            key={align}
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            style={{
              padding: '5px 10px',
              cursor: 'pointer',
              background: editor.isActive({ textAlign: align }) ? '#ddd' : 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            {label}
          </button>
        ))}

        {/* Remove Alignment */}
        <button type='button'
          onClick={() => editor.chain().focus().unsetTextAlign().run()}
          style={{ padding: '5px 10px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          ⛔ Unset
        </button>

        {/* Image Upload */}
        <button type='button'
          onClick={addImage}
          style={{ padding: '5px 10px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          🏞️ Image
        </button>
      </div>

      {/* Editor */}
      <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', minHeight: '150px' }}>
        <EditorContent editor={editor} />
      </div>

      <style>
        {`
          .tiptap ul {
            padding-left: 20px;
          }
          .tiptap img {
            display: block;
            width: 100%; /* Full width */
            height: auto; /* Keeps aspect ratio */
            margin: 10px auto; /* Center images */
          }
          .tiptap:focus {
            outline: none !important;
          }
        `}
      </style>
      <button type='submit' style={{padding: '10px 30px', cursor: 'pointer', border: 'none', margin: '20px 3px', borderRadius: '5px', fontWeight: 'bold'}}>Submit</button>
    </form>
    </>
  )
}

export default Tiptap;
