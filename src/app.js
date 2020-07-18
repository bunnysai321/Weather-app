const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 9000


//Define paths for express cofig
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlers and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup location for static files to display in server
app.use(express.static(publicDirPath))


 app.get('',(req,res) =>{
 	res.render('index',{
 		title : "Weather App",
 		name : "Bunny"
 	});
 })


app.get('/about',(req,res)=>{
	 res.render('about',{
	 	title : "About me ",
 		name : "Katherine	"
	 })
});

app.get('/help',(req,res)=>{
	 res.render('help',{
	 	title:"Help",
	 	help:"Wat kind of help u need ",
	 	name: "Bunny"
	 })
});

app.get('/weather',(req,res)=>{
	const address = req.query.address;
	 if(!req.query.address){
	 	return res.send({
			error:"Enter the address query to search"
		})
	 }else{
	 	geocode(address,(error,{latitude,longitude,location}={})=>{
	if(error){
		// console.log("error occured")
		return res.send({error })
	}else{
	
	forecast(latitude,longitude,(error,forecastData)=>{
			if(error){
				
					res.send({
						error:error
					});
				}

				res.send({
					location:location,
					forecast:forecastData,
					address:req.query.address

					})

	})
	}})
	 }


});

app.get('/products',(req,res)=>{
	if(!req.query.search){
		return res.send({
			error:"Enter the search query to progess"
		})
	}
	console.log(req.query);
	res.send({
		products : []
	})
})

app.get('/help/*',(req,res)=>{
	res.render('error',{
		title:"Help page not found",
		errormessage:"Error 404 Help article not found"
	})
})

app.get('*',(req,res)=>{
	res.render('error',{
		title:"Error 404",
		errormessage:" Page not found",
		name:"Bunny"
	})
})

app.listen(port,()=>{
	console.log("listening.. at "+ port)
})