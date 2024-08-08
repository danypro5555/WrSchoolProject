const express = require("express")
const multer = require('multer')
const session = require("express-session") //import the session method
const conn = require('./db')

const upload = multer()
const app = express()

app.use(express.static("public/assets"));
app.use(upload.array()); // Handle multipart/form-data
app.use(express.urlencoded({ extended: true })); // Parse urlencoded bodies
app.use(express.json()); // Parse JSON bodies

app.set("view engine", "ejs")

const playerauthen = (req, res, next) => {

  if (req.session.userData) {
      // User is logged in, allow access to the route
      next();
  } else {
      // User is not logged in, redirect to the login page
      res.redirect('/'); // Replace '/login' with your login route
  }
}
const adminauthen = (req, res, next) => {

  if (req.session.userData) {
      // User is logged in, allow access to the route
      next();
  } else {
      // User is not logged in, redirect to the login page
      res.redirect('/'); // Replace '/login' with your login route
  }
}




app.use(
    session({
        secret:'this_is_a_secret_key',
        resave: false,
        saveUninitialized: true,
    })
)




app.get("/",(req,res)=>{
res.render('login')
})

app.get("/registration",(req,res)=>{
    res.render('registration')
    })

app.get("/logout", (req, res) => {
    // Destroy the session data
    req.session.destroy((err) => {
      if (err) {
              console.error('Error destroying session:', err);
              return res.status(500).send('Internal Server Error');
               }
  
          // Redirect the user to the login page after logout
      res.redirect('/');
      });
  });

  app.get("/players",playerauthen,(req,res)=>{
    res.render('player_profile') 
  })
  app.get("/player",playerauthen,(req,res)=>{
    res.render('home') 
  })

  app.get('/api/players_ign', (req, res) => {
    const userData = req.session.userData;
    const ign = userData.username;
    console.log(ign)
    conn.query('SELECT * FROM ewan WHERE joiner=? ',[ign], (error, results) => {
    console.log(results)
      const riot_id= results[0].riot_id
    
    if(riot_id==''){
      console.log("Without ID");
      const text = "ASD";
const newId = results[0].id + 1;
const newriotid = "QWERT"+newId + "" + text;


conn.query('UPDATE ewan SET riot_id=? WHERE joiner=?',[newriotid,ign], (error, respo) => {

console.log(respo)
conn.query('SELECT * FROM summoner JOIN ewan ON summoner.ign = ewan.joiner WHERE summoner.ign = ? AND summoner.role = "player"', [ign], (error, resultss) => {
  if (error) {
    console.error('Error fetching account data:', error);
    res.status(500).json({ error: 'Failed to fetch account data' });
  } else {

const accounts = resultss;
    console.log(accounts )
    res.json(accounts);

  

   
 }
})

})
    }else{
      console.log("With ID");
    conn.query('SELECT * FROM summoner JOIN ewan ON summoner.ign = ewan.joiner WHERE summoner.ign = ? AND summoner.role = "player"', [ign], (error, resultss) => {
      if (error) {
        console.error('Error fetching account data:', error);
        res.status(500).json({ error: 'Failed to fetch account data' });
      } else {
   
 const accounts = resultss;
        console.log(accounts )
        res.json(accounts);

      

       
     }

    })
  }



  }
)
  });

  app.get("/admin",adminauthen,(req,res)=>{
    
    res.render('admin_home')
  })


 
  app.post('/update_player/ign', (req, res) => {
    const { myInput,name} = req.body; 
    console.log("IGN  "+myInput)
    var currentDate = new Date();
var futureDate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));
    conn.query('UPDATE ewan set name=? ,duration=?   WHERE joiner = ?', [name,futureDate,myInput], (error, results) => {
      if (error) {
        console.error('Error fetching account data:', error);
        res.status(500).json({ error: 'Failed to fetch account data' });
      } else {
        
         
          req.session.userData = {
            username: myInput,
            role:'player',
        };
 
      res.redirect('/players') 
    }
  })
      })

  app.post('/update_player/PersonalInfo', (req, res) => {
    const { myInput,email } = req.body; 
    conn.query('Select email from summoner WHERE email = ?', [email], (error, resultss) => {
     if(resultss.length>0){
      res.status(500).json({ error: 'Please Use Another Email' });
     }
else{
   
    console.log("Playerinfo"+myInput)
    conn.query('UPDATE summoner set email=? WHERE ign = ?', [email,myInput], (error, results) => {
      if (error) {
        console.error('Error fetching account data:', error);
        res.status(500).json({ error: 'Failed to fetch account data' });
      } else {
     
          
          req.session.userData = {
            username: myInput,
            role:'player',
        };
     
        res.status(200).json({ error: 'wala' });
      }
 })
  }})
  }); 

  app.post('/update_player/Security', (req, res) => {
    const { passss,myInput } = req.body; 
   
    console.log("Playerinfo"+myInput)
    conn.query('UPDATE summoner set password=? WHERE ign = ?', [passss,myInput], (error, results) => {
      if (error) {
        console.error('Error fetching account data:', error);
        res.status(500).json({ error: 'Failed to fetch account data' });
      } else {
     
          
          req.session.userData = {
            username: myInput,
            role:'player',
        };
     
        res.status(200).json({ msg: 'Password Successfully Change' });
      }

    })
  }); 


  app.get('/Champion',playerauthen,(req,res)=>{
  res.render('heroes')
 })
    
 app.post('/login_authentication', (req,res) => {
      const { ign, password } = req.body;
      // Fetch user data from the database
      conn.query('SELECT ign,role,password FROM summoner WHERE ign = ?', [ign, password], (error, results) => {
          if (error) {
              console.error(error);
              return res.status(500).send('Internal Server Error');
          }
            
          // Check if a user with the given username exists
          if (results.length > 0) {
              const user = results[0];
             
         if(results[0].password==password){
              // Save user data to session
              req.session.userData = {
                  username: user.ign,
                  role: user.role
              };
           
              if(user.role=='admin'){
                const key={
                  results:"admin"
                 }
                    res.json(key);
              }else{
                conn.query('SELECT bantime FROM banning WHERE ingame = ?', [ign], (error, resultss) => {
                  if (error) {
                    console.error('Error retrieving ban time:', error);
                    return res.status(500).json({ error: 'Failed to retrieve ban time' });
                  } 
                  console.log(resultss)
                  
                  const banTime = resultss[0].bantime;
                  const currentTime = new Date();
             
                  
                
                  if (banTime.toLocaleString('en-US', { timeZone: 'Asia/Manila' }) <  currentTime.toLocaleString('en-US', { timeZone: 'Asia/Manila' })||banTime=='Invalid Date') {
                
                    const key={
                  results:"player"
                 }
                    res.json(key);// Redirect to the appropriate route for a banned player
                    

                 
                 
                  } else {
                    res.status(404).send('<script>alert("Player is banned"); window.history.back();</script>');
                  }
                });
           
              }            // Replace '/dashboard' with your desired route
         }
        else{
         
          res.json({results:"Wrong Password",acc:ign,pass:password});

        }
        } else {
          
             
            
                    res.json({results:"Invalid Account",acc:ign,pass:password});
        
                  }
      });
  })
  
app.post('/insertdata', (req, res) => {
    const { ign,email,password,nationality,age,code } = req.body; // Assuming the request body contains the data to be inserted
    conn.query("SELECT * FROM summoner WHERE email=?", [email], (error, resultsss) => {
      if (resultsss.length > 0) {
         return res.status(404).json({ message: "taken" ,acc:ign,mail:email});
      }else{
    if(code!='secret'){
    // SQL query to insert data into the database
    const insertQuery = `INSERT INTO summoner (ign,email,password,nationality,age,role) VALUES (?, ?, ?,?,?,'player')`;
  
    // Execute the query with the provided data
   conn.query(insertQuery, [ign,email,password,nationality,age], (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);

        const stat = JSON.stringify(error);
   if(stat.includes("Duplicate entry")){
    return res.status(404).json({ message: "duplicate" ,acc:ign,mail:email});
      }
      } 
      
      
      else {
    
            conn.query("INSERT INTO banning (ingame,bantime) VALUES (?,'')", [ign],(error, results) => {
              console.log('Data inserted successfully');

              conn.query("INSERT INTO ewan (joiner) VALUES (?)", [ign],(error, results) => {
                  return res.status(200).json({ message: "Success" });
            })
       
      
      })
    }
    }) 
  }else{     
   
  
    const insertQuery = `INSERT INTO summoner (ign,email,password,nationality,age,role) VALUES (?, ?, ?,?,?,'admin')`;
  
    // Execute the query with the provided data
   conn.query(insertQuery, [ign,email,password,nationality,age], (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        const stat = JSON.stringify(error);
        if(stat.includes("Duplicate entry")){
         return res.status(404).json({ message: "duplicate" ,acc:ign,mail:email});
           }
    
        
      } else {  
        return res.status(200).json({ message: "Success" }); 
 
  }

})    
    }
 


 }}) });

  app.get('/api/accounts', (req, res) => {
    // Retrieve account data from your database or any other data source
    
    conn.query('SELECT summoner.*, banning.bantime FROM summoner JOIN banning ON summoner.ign = banning.ingame',(error, results) => {
      if (error) {
        console.error('Error fetching account data:', error);
        res.status(500).json({ error: 'Failed to fetch account data' });
      } else {
        const accounts = results;
        console.log(accounts  )
        res.json(accounts);
      }

    })
 
  });
  function calculateBanEndTime(duration) {
    const banDurationInHours = duration; // Replace with your logic to calculate ban duration in hours
    const currentTime = new Date();
    const banEndTime = new Date(currentTime.getTime() + banDurationInHours * 60 * 60 * 1000);
    
    return banEndTime;
  }
  app.post('/ban', (req, res) => {
    const { ign, duration } = req.body;
  
    

    // Calculate the ban end time based on the duration
    const bantime = calculateBanEndTime(duration);
  
    // Perform the ban logic here
    conn.query('UPDATE banning SET bantime = ? WHERE ingame= ?', [bantime, ign], (error, result) => {
      if (error) {
        console.error('Error banning account:', error);
        res.status(500).json({ error: 'Failed to ban account' });
      } else {
        console.log(`Banned account: ${ign} until ${bantime}`);
        res.sendStatus(200);
      }
    });
  });
  app.post('/del', (req, res) => {
    const { ign } = req.body;
    conn.query('DELETE FROM banning WHERE ingame = ?', [ ign], (error, result) => {
      if (error) {
        console.error('Error banning account:', error);
        res.status(500).json({ error: 'Failed to delete account' });
      } else { conn.query('DELETE FROM summoner WHERE ign = ?', [ ign], (error, result) => {
        console.log(`Delete account: ${ign}`);
        res.sendStatus(200);
           })}

    })
  })
  app.post('/Removeban', (req, res) => {
    const { ign } = req.body;
    const time = '0000-00-00 00:00:00';
  
    conn.query('UPDATE banning SET bantime = ? WHERE ingame = ?', [time, ign], (error, result) => {
      if (error) {
        console.error('Error removing ban:', error);
        res.status(500).json({ error: 'Failed to remove ban' });
      } else {
        console.log(`Ban removed for user ${ign}`);
        res.sendStatus(200);
      }
    });
  });


app.listen(3300)