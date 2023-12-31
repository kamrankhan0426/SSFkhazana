const mongoose = require('mongoose');

const register_newUser = new mongoose.Schema({
    parent_client_Id: {
        type: String,
        required: false,
    },
    client_Id: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    masteraccount :{
        type: String,
        required: false,
    },
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },    
    phone: {
        type: String,
        required: false,
    },
    aadhaar: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    profileimg: {
        type: String,
        required: false,
    },
    accountstatus: {
        type: String,
        required: false,
    },
    createddatetime: {
        type: Date,
        required: false,
    },
    accounttype: {
        type: String,
        required: false,
    },
    plan_pricing: {
        type: String,
        required: false,
    },
    balance: {
        type: String,
        required: false,
    },
    today_income: {

    },
    monthly_income: {

    },
    yesterday_income: {

    },
    network_earn: {
        type: String,
        required: false,
    },
    purchased_coinA : {

    },
    purchased_coinB : {
        
    },
    purchased_coinC : {
        
    },
    CoinHistory : []
});


const coin = new mongoose.Schema({
    
    CoinA : {

    },
    CoinB : {

    },
    CoinC : {

    },
    id : {

    },
    CoinA_Stock : {

    },
    CoinB_Stock : {

    },
    CoinC_Stock : {

    },
});
const transactions = new mongoose.Schema({
    name: {},
    adding_amount: {},
    withdraw_amount: {},
    email: {}, client_Id: {},
    dateTime: {}, status: {},
    admin_response: {},
    srNo: {},
    type: {},
    transactions : []
});

// const transactions = new mongoose.Schema({
//     transactions : []
// });

const coins = mongoose.model('coin', coin);
const transaction = mongoose.model('transaction', transactions);
const Users = mongoose.model('User', register_newUser);

module.exports = { Users , coins , transaction};
