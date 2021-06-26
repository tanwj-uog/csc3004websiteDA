var checkedBoxTrueResult = [];
var cryptoSelected = [];
var cryptoValue = [];

function initialConnection(){

  fetch('https://csc3004webserver.azurewebsites.net/all')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {

        cryptoSelected = [];
        cryptoValue = [];

        for(let i = 0; i < data.length; i++){
          for(let x = 0; x < checkedBoxTrueResult.length; x++){
            if(data[i].TopicName == checkedBoxTrueResult[x]){
              cryptoSelected.push(data[i].TopicName);
              cryptoValue.push(data[i].Score);
            }
          }
        }
        document.getElementById("userSelectedChart").innerHTML=populateChart();
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :', err);
  });
}

function getAllCheckBox(){

  var dogecoinCb = document.getElementById("dogecoinCb");  
  var bitcoinCb = document.getElementById("bitcoinCb");  
  var cardanoCb = document.getElementById("cardanoCb");  
  var ethereumCb = document.getElementById("ethereumCb");  
  var polkadotCb = document.getElementById("polkadotCb");  
  var moneroCb = document.getElementById("moneroCb"); 

  var checkedBoxStatus = [dogecoinCb, bitcoinCb, cardanoCb, ethereumCb, polkadotCb, moneroCb];

  checkedBoxTrueResult = [];

  for(let i = 0; i < checkedBoxStatus.length; i++){
    if(checkedBoxStatus[i].checked == true){
      checkedBoxTrueResult.push(checkedBoxStatus[i].value);
      console.log(checkedBoxStatus[i].value)
    }
  }
}

function makeConnection(){
 
  getAllCheckBox()
  //https://csc3004webserver.azurewebsites.net/
  fetch('https://csc3004webserver.azurewebsites.net/all')
  .then(
    function(response) {
      console.log("Testing " + response.status);
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {

        cryptoSelected = [];
        cryptoValue = [];

        for(let i = 0; i < data.length; i++){
          for(let x = 0; x < checkedBoxTrueResult.length; x++){
            if(data[i].TopicName == checkedBoxTrueResult[x]){
              cryptoSelected.push(data[i].TopicName);
              cryptoValue.push(data[i].Score);
            }
          }
        }
        resetChartCanvas();
        document.getElementById("userSelectedChart").innerHTML=populateChart();
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :', err);
  });
}

function populateChart(){

var xValues = [];
var yValues = [];

for(let i = 0; i < cryptoSelected.length; i++){
  xValues.push(cryptoSelected[i]);
  yValues.push(cryptoValue[i]);
}

var barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145",
  "#EAD821",
  "#2DEA21"
];

new Chart("userSelectedChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: { 
      display: false,
      text: "0-Very Negative 1-Negative 2-Neutral 3-Positive 4-Very Positive"
     },
    title: {
      display: true,
      text: "Sentiment scores of selected cryptocurrency"
    },
    scales: {
      yAxes: [{
          ticks: {
             beginAtZero: true
            //  min: 0
          }
      }]
  },
  plugins: {
    title: {
        display: true,
        text: '0-Very Negative 1-Negative 2-Neutral 3-Positive 4-Very Positive',
        position: 'bottom'
            }
          }
        }
});
// new Chart("userSelectedChart", {
//   type: "doughnut",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   },
//   options: {
//     title: {
//       display: true,
//       text: "Selected Score"
//     }
//   }
// });

}

function resetChartCanvas(){
  $('#userSelectedChart').remove();
  $('#chartContainer').append('<canvas id="userSelectedChart"><canvas>');
}




function reCrawl(){

  fetch('https://csc3004webserver.azurewebsites.net/updateall')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :', err);
  });
}






















// function reCrawl(){

//   var dataArray =[{ "Id": 6 }, { "Id": 2 }, { "Id": 3 }, { "Id": 4 }, { "Id": 9 }, { "Id": 10 }];

//   let promises = [];
//   let promisesResult = [];

//    for(let i = 0; i < dataArray.length; i++){
    
//     promises.push(fetch('http://localhost:5000/update', {
//       method: 'POST', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(dataArray[i]),
//     })
//     );
//     console.log(dataArray[i]);
//   }
//   Promise.all(promises).then(response => {
//     console.log(response);
//   })
//   .catch(error => console.log(`Error in executing ${error}`))
// }

// function reCrawl(JSON){

//   let promises = [];

//   for(let i = 0; i < dataArray.length; i++){
    
//     var data = dataArray[i];
//     console.log("playung with fire " + data);
 
//     fetch('http://localhost:5000/update', {
//       method: 'POST', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//       console.log('DATA HAVE BEEN POSTED AND DONE');
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   }
// }






// }
  // function makeConnection(){
  
  //   fetch('https://csc3004webserver.azurewebsites.net/all', {
  //     mode: 'no-cors' // 'cors' by default
  //   })
  //   .then(function(response) {
  //     console.log("inside le");
  //     return response.json();
  
  //     // Do something with response
  //   })
  //     .catch(function (error) {
  //     console.log("Error: " + error);
  //   });
  //   }

//connection try 02
// function initialConnection(){
//    console.log("initiating tryCon function");
//    var connection = new ActiveXObject("ADODB.Connection") ;
//    //var connectionstring="Data Source=<csc3004.database.windows.net>;Initial Catalog=<csc3004>;User ID=<csc3004>;Password=<Webcrawler3004>;Provider=SQLOLEDB";
//    var tryString = "Driver={ODBC Driver 13 for SQL Server};Server=tcp:csc3004.database.windows.net,1433;Database=csc3004;Uid=csc3004;Pwd={your_password_here};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;";
//    // var connectionstring="Data Source=database.windows.net;Initial Catalog=csc3004;User ID=csc3004;Password=Webcrawler3004;Provider=SQLOLEDB";
//    // Driver={ODBC Driver 13 for SQL Server};Server=myServerAddress;Database=myDataBase;UID=myUsername;PWD=myPassword;
//    // var connectionstring = "Data Source=csc3004.database.windows.net;Driver={ODBC Driver 13 for SQL Server};Database=csc3004;UID=csc3004;PWD=Webcrawler3004;";
//    var connectionstring = "Driver={ODBC Driver 13 for SQL Server};Server=tcp:csc3004.database.windows.net,1433;Database=csc3004;Uid=csc3004;Pwd={Webcrawler3004};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;Provider=SQLOLEDB;";
//    connection.Open(connectionstring);
//    var rs = new ActiveXObject("ADODB.Recordset");
//    console.log("Accessed db");
//    rs.Open("SELECT * FROM csc3004.dbo.Table1", connection);
//    console.log("TEST:" + rs.fields(1));
//    while(!rs.eof){
//       console.log("looping number field 1: " + rs.fields(1));
//       console.log("looping number field 2: " + rs.fields(2));
//       rs.movenext;
//    }
//    // rs.MoveFirst
//    // while(!rs.eof){
//    //    document.write(rs.fields(1));
//    //    rs.movenext;
//    // }

//    rs.close;
//    connection.close; 
// }



//Connection to azure sql
// var connection = new ActiveXObject("ADODB.Connection") ;

// var connectionstring="Data Source=<csc3004.database.windows.net>;Initial Catalog=<csc3004>;User ID=<csc3004>;Password=<Webcrawler3004>;Provider=SQLOLEDB";

// connection.Open(connectionstring);
// var rs = new ActiveXObject("ADODB.Recordset");

// rs.Open("SELECT * FROM table", connection);
// rs.MoveFirst
// while(!rs.eof)
// {
//    document.write(rs.fields(1));
//    rs.movenext;
// }

// rs.close;
// connection.close; 

// connection try 01
/* <script type="text/javascript">
  var conn = new ActiveXObject("ADODB.Connection")//creating the connection object
  var conn_str = ""
  var db_Host = ""
  var db_User = ""
  var db_Password = ""
  var db_Provider = ""
  var db_Default = ""
  
  function Show_Data()
  {
  db_Host = "csc3004";//your computer name
  db_User = "csc3004";//system admin user
  db_Password = "Webcrawler3004";
  db_Provider = "SQLOLEDB";
  db_Default = "csc3004";//database name
  conn_str = "Provider="+db_Provider+";Data Source="+db_Host+"; User Id="+db_User+"; password="+db_Password+"; Initial Catalog="+db_Default;
  show_data_from_database();
  }
  function show_data_from_database()
  {
  try
  {
  conn.Open(conn_str)//open the connection
  //alert(conn)
   var reader = new ActiveXObject("ADODB.Recordset");//creating an object of adodb to read the data as rows 
   var strQuery = "SELECT * FROM  dbo.Table1";//query string 
      reader.Open(strQuery, conn);//fetch the data
      reader.MoveFirst();//move to the first row
      while (!reader.eof) //reaad until the last row of data
    {
          document.write(reader.fields(0) + "&nbsp;&nbsp;&nbsp;");//print to the screen
          document.write(reader.fields(1) + "&nbsp;&nbsp;&nbsp;");
          document.write(reader.fields(2) + "<br/>");
           //alert(rs.fields(0));
          reader.movenext();//move to the next row
      }
  
  }
  catch(e)
  {
  alert("Error creating Connection")
  }
  }
  </script> */