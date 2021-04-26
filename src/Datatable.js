///Scrapped Idea
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tqfxngqllsbyjf',
  host: 'ec2-34-237-166-54.compute-1.amazonaws.com',
  database: 'd1rjlqb4p7m4mu',
  password: '035f70f6d06c7be2b8450da910be0eac3993abd7e47e011048331e76e69fbf82',
  port: 5432,
});

const getLocation = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM public.locations', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }


module.exports = {
    getLocation
}