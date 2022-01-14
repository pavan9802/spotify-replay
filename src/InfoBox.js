import React from 'react'
import { Card, CardContent } from "@material-ui/core";
import Fade from 'react-reveal/Fade';
import "./InfoBox.css"

function InfoBox({type, data}) {
    // console.log(data);
    
  
    return (
        <Fade delay={300}>
        <div className = "idk">
                
              { data.items  !== undefined ?data.items.map((item, index) => (
                
                 <a href={item.external_urls.spotify}>
                <Card className = "info_box">
                <CardContent>
                
               
                <div className="row">
                    <div className="num">
                        <p>
                            {" "}
                            {index + 1 + ". "} 
                        </p>
                    </div>
                
                    <div className="picture">
                        
                            <img
                               src={type ==="artists" ? item.images? item.images[2].url: console.log('error InfoBox images')
                               : item.album?  item.album.images[2].url : console.log('error InfoBox images')}
                                alt="img"
                                height="75px"
                                width="75px"
                            />
                      
                      
                    </div>

                    <div className="info">
                        <div className="name">
                            <h4>{item.name}</h4>
                        </div >

                        <div className="rest">
                            
                            <p>
                        

                            {type ==="artists"?item.genres
                                : item.artists? item.artists[0].name : console.log("error geting artists")}
                            
                            </p>
                            
                        </div >
                        
                    </div >
                        
                </div>
                
                    
                </CardContent>
                </Card>
                  </a>
                
            )):console.log('yghglkjhkljhlkjhlk') }
            
           
        </div>
        </Fade>
    )

 
}

export default InfoBox
