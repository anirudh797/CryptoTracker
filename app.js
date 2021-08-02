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
    const time = r.data.timestamp;
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
