import app from './app.js';
import { connectDB } from './db.js';

connectDB();
const PORT = process.env.PORT || 4000;
app.listen(PORT); //app.listen(4000);
console.log('Server running on port ' + PORT);
