import DriverHome from "./DriverHome";
import '../GlobalCSS/content.css'


export default function DrvTravels() {


    return(
        <div>
            <DriverHome />
            <div className="main-content">
                <div>
                    <label>Travel Request & Schedule</label>
                </div>

                <div>
                    <label>All List</label>
                </div>

                <div>
                    <input type="text" placeholder="Search"></input>
                    <button>Filter</button>
                </div>

                {/* <Typography variant="body1">Hello World</Typography> */}

                
            </div>
        </div>
    );
}