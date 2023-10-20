export default function handler(req, res) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).end('Unauthorized');
    }

    let url = "" 

    axios.get(url, {
        headers: {
            'Authorization': process.env.CRON_SECRET
        }
    })
    .then((response) => {
    console.log('Resposta:', response.data);
    })
    .catch((error) => {
    console.error('Erro:', error);
    });
}