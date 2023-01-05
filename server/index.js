import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; //object data modeling library for mongodb and node.js
import cors from 'cors'; //allows a server to indicate any origins other than its own which a browser should permit loading resources
import dotenv from 'dotenv';
import helmet from 'helmet'; //helps secure Express apps
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';


//data imports
import User from './models/User.js';
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from './models/Transaction.js';
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from './models/AffiliateStat.js';
import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat
} from "./data/index.js";



/* Configuration */
/*middleWare*/
dotenv.config(); //sets up enviroment variables
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//allows us to make cross origin requests
//something needed to make api calls from another server
app.use(morgan('common'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());


/* Routes */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000; //allows access to .env file if doesn't exist 9000 is backup port
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, //splits url into it's components
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

    /*ONLY ADD DATA ONE TIME*/
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
})
    .catch((error) => console.log(`${error} can't connect`));


