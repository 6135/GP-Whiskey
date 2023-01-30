import { getCurrentUser } from '../../services/AuthService';
import './homepage.css';


function Homepage() {
  return (
    <div className="Homepage">
      <p>
        OLA SOU O MAIOR
        {console.log(getCurrentUser())}
      </p>
    </div>
  );
}

export default Homepage;
