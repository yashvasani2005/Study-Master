exports.courseenroll = (coursename , name) => {
    return `
    
    <!DOCTYPE html>
    <html>
    <head>
                <meta charset="UTF-8">
             <title> Password Updated Confirmation </title>
             <style>
                body{
                background-color:#ffffff;
                font-family:"Arial, sans-serif";
                font-size:16px;
                line-height:1.4;
                color:#333333;
                margin:0;
                padding:0;
                }
           
                .container{
                max-width:600px;
                margin:0 auto;
                padding:20px;
                text-align:center;
           
                }
                .logo{
                max-width:200px;
                margin-bottom:20px;
           
               }
                .message{
                  font-size:18px;
                  font-weight:bold;
                  margin-bottom:20px;
           
                }
           
                .body{
                font-size:16px;
                   margin-bottom:20px;
                }
             .support{
              font-size:14px;
              color:#999999;
             margin-top:20px;
               }
             .highlight{
             font-weight:bold
             }
              .cta{
                   display:inline-block;
                   padding:10px 20px;
                   background-color:#FFD60A;
                   color:#000000;
                   text-decoration:none;
                   border-radius:5px;
                   font-size:16px;
                   font-weigth:bold;
                   margin-top:20px;
                   }

             </style>

            </head>
      <body>
                 <div class="container">
                 <a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                         src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Study Master Logo"></a>

                < div class="message"> Course Registration Confirmation </div>
                  <div class=" body">
                       <p> Dear ${name}, </p>
                       <p> Your have successfully register for the course <span class="highlight"<${coursename}</span>
                               are excited to have you  as a participant!!  
                       </p>

                       <p>plaese Login in to your learning dashboard to access the course metirial and start your learning</p>
                       <a class="cta" href="https://studynotion-edtech-project.vercel.app/dashboard">Go to the dashboard</a>
                      
                       </div>

                       <div class="support"> If you have any questions then you can direct contact us 

                            <a href="mailto: vasaniyash2005@gmail.com">vasaniyash2005@gmail.com</a>. We are here to help!!

                            </div>
                            </div>


       
      </body>
      </html>
      

     `;
};