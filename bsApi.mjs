const idPlayer = encodeURIComponent("#PJQPLQGR");
fetch(`https://api.brawlstars.com/v1/players/%23PJQPLQGR`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.BS_TOKEN}`,
  },
})
  .then((data) => data.json())
  .then((data) => console.log(data));
