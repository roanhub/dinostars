async function bsApi(idP) {
  const idPlayer = encodeURIComponent(idP);
  const res = await fetch(`https://api.brawlstars.com/v1/players/${idPlayer}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.BS_TOKEN}`,
    },
  })
    .then((data) => data.json())
    .then((data) => data);

  return res;
}

export default bsApi

