import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import user_routs from './handlers/user_handler'
import product_routs from './handlers/product_handler'
import order_routs from './handlers/order_handler'
import verify from './middlewares/verifyJWT'
import oder_products_routs from './handlers/order-produts_handler';
const app: express.Application = express()
const port: number = 3000;

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
user_routs(app);
product_routs(app);
order_routs(app);
oder_products_routs(app)

app.listen(3000, function () {
    console.log(`starting app on port : ${port}`)
})

export default app;