import Car from '../models/Car.js'
export const car =async(req,res, next)=>{
    try {
        let body = req.body
        const newCar = new Car(body);
        await newCar.save();
        res.status(200).send("Car has been Added.");
      } catch (err) {
        next(err);
      }
}