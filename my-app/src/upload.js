import React, { useState} from 'react'
import '../css/index.css';
import '../css/bootstrap.min.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';



const Private = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const Catogory = [
    { value: 0, label: "Music Videos" },
    { value: 0, label: "Commentary" },
    { value: 0, label: "Reviews" }, 
    { value: 0, label: "Tutorials" },
    { value: 0, label: "Top Lists" },
    { value: 0, label: "Comedy" },
    { value: 0, label: "Challenges" },
    { value: 0, label: "Reactions" },
    { value: 0, label: "Q&A" },
    { value: 0, label: "Interview" },
    { value: 0, label: "Docuseriesn" },
    { value: 0, label: "Educational" },
    { value: 0, label: "Narratives" },
    { value: 0, label: "Gaming" },
    { value: 0, label: "ASMR" },
    { value: 0, label: "Sports" },

]

function Upload(props){

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Music Videos")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("") 

   

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value)
        console.log(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }

    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value)
        console.log(event.currentTarget.value)
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value)
        console.log(event.currentTarget.value)
    }
    const onSubmit = (event) => {

        event.preventDefault();


        if (title === "" || Description === "" ||
            Categories === "" || FilePath === "" ||
            Duration === "" || Thumbnail === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        }

        axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    props.history.push('/')
                } else {
                    alert('Failed to upload video')
                }
            })

    }
    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    //gerenate thumbnail with this filepath ! 

                    axios.post('api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.thumbsFilePath)
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })
                   


                } else {
                    alert('failed to save the video in server')
                }
            })

    }
    return(
        <div>
            
               <form onSubmit={onSubmit}> 
                   <div className="form-group">
                   <Dropzone
                       onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                               

                            </div>
                        )}
                    </Dropzone>
                    
                    {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                        </div>
                    }
                   </div>
                   <div className="form-group">
                       <input type="text" className="form-control" placeholder="Title" name="titleInput" required value={title} onChange={handleChangeTitle}></input>
                   </div>
                   <div className="form-group">
                      <textarea rows="3" type="text" className="form-control" name="dInput" placeholder="Description" value={Description}  onChange={handleChangeDecsription}></textarea>
                   </div>
                   <div className="form-group">
                       <select className="form-control" id="exampleFormControlSelect1" onChange={handleChangeOne}>
                       {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                       </select>
                   </div>
                   <div className="form-group">
                        <select className="form-control" id="exampleFormControlSelect2" onChange={handleChangeTwo}>
                            {Catogory.map((item, index) => (
                                <option key={index} value={item.label}>{item.label}</option>
                                        ))}
                        </select>
                    </div>
                   <div className="form-group">
                       <button  onClick={onSubmit}>Upload</button>
                   </div>

               </form>
        </div>
    )
}

export default Upload;