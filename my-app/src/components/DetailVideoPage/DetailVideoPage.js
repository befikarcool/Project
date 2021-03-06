import React, { useEffect, useState } from 'react'
import { List, Avatar } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import '../../css/bootstrap.min.css';

function DetailVideoPage(props) {


    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
   
    console.log(videoId)

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])

  return(
    <div className="container">
        <div className="row">
            <div className="col-12 col-lg-8">

                <div className="postPage" style={{ width: '100%'}}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

                    <List.Item
                        actions={[]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src='true'/>}
                            title={<a href="https://ant.design">{Video.title}</a>}
                            description={Video.description}
                        />
                   
                    </List.Item>
                </div>
            </div>
            <div className="col-12 col-lg-4">
                <SideVideo />
            </div>

       </div>
    </div>
      
  )
  }

export default DetailVideoPage;

