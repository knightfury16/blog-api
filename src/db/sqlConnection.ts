import { myDataSource } from '../app-data-source';

myDataSource
  .initialize()
  .then(() => {
    console.log('Connected to database succesfully!');
  })
  .catch(error => {
    console.log(error);
  });
