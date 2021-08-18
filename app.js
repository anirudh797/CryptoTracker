const form = document.querySelector('#searchForm');
// const res = document.querySelector('#result');
const res = document.querySelector('#tableResult');
let upd;



form.addEventListener('submit',(e) =>{

    e.preventDefault();

    //if for any previous coinType update is still happening
    //then clear that update
    if(upd)
    {
        clearTimeout(upd);
    }
    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);

    // console.log(ctype);
    

});


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }


const fetchPrice = async(ctype)=>
{
    let list = ctype.split('-');
    // console.log(list);
    // console.log(list[1]);
    const r = await axios.get(`https://api.cryptonator.com/api/ticker/${ctype}`);
    let price = r.data.ticker.price;
  
   const volume = r.data.ticker.volume;
   const change = r.data.ticker.change;
   const base = r.data.ticker.base;
   
   let target = r.data.ticker.target;
    const time = timeConverter(r.data.timestamp);
    // if(list[1]=="inr")
    // {price*=70;
    //  target = "INR"
    // }    

    res.innerHTML = ` <tr style ="background-color:green; color:white; font-weight: 800" >
    <th>Property</th>
    <th> Value</th>
    </tr>

    <tr>
       <td>${base}</td>
        <td>${price} ${target}  </td>
    </tr>

    <tr>
        <td>Volume</td>
         <td > ${volume}</td>
     </tr>

     <tr>
        <td>Change</td>
         <td > ${change}</td>
     </tr>

     <tr>
        <td>Last Updated</td>
         <td >${time } </td>
     </tr>

     
`;

upd = setTimeout(()=>fetchPrice(ctype),100000);

};
