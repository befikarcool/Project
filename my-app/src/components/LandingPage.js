import React, { useEffect, useState } from 'react'

import { Typography  } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;

function LandingPage() {

    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])





    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <div className="pic" style={{ position: 'flex' }}  key={video._id} > 
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div>

            <div className='te'>
                <b>{video.title}</b>
            </div> 

            <div>
            <span><i>{video.writer.name} </i></span>
            </div>
            <div>
            <span style={{ marginLeft: '3rem' }}> {video.views}views</span>
            -<span> {moment(video.createdAt).format("MMM Do YY")} </span>
            </div>
        </div>

    })



    return (
        <div >
            <Title level={2} > Recommended </Title>
            <hr />

           
                {renderCards}
           
        </div>
    )
}

export default LandingPage;
