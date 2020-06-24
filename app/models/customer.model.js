const sql = require('./db');

// Constructor for customer
const Customer = function(customer){
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
};

Customer.create = (newCustomer,result)=>{
    sql.query('Insert into cusotmers set ?',newCustomer,(err,res)=>{
        if(err) throw err;
        //console.log('Inserted');
        result(err,null);
        return;
    });
};

Customer.findById = (customerId,result)=>{
    sql.query(`Select * from customers where id = ${customerId}`,(err,result)=>{
        if(err) throw err;
        if(result.length){
            result(null,result[0]);
            return;
        }
        result({kind:'not_found'},null);
    });
};

Customer.getAll = (result)=>{
    sql.query(`Select * from customers`,(err,res)=>{
        if(err){
            result(null,err);
            return;
        };
        console.log('customers',res);
        result(null,res);
    });
};

Customer.updateById=(id,customer,result)=>{
    //update the customer
    sql.query(`Update customers set email=?,name=?,active=? where id=${id}`,[customer.email,customer.name,customer.active],(err,res)=>{
        if(err){
            res(null,err);
            return;
        }
        if(result.affectedRows == 0 ){
            result({kind:'not_found'},null);
            return;
        }
        console.log("updated customer: ", { id: id, ...customer });
        result(null,{id:id,...customer});
    });
};

Customer.remove=(id,result) =>{
    //Remove the customer
    sql.query('DELETE FROM customers WHERE id = ?',id, (err,res) =>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0 ){
            result({kind:'not_found'},null);
            return;
        }
        console.log("Deleted customer with id: ",id);
        result(null,res);
    });
};

Customer.removeAll = (result)=>{
    //Remove all the customers from database
    sql.query('DELETE FROM customers', (err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log(`deleted ${res.affectedRows} customers`);
        result(null,res);
    });
};

module.exports = Customer;