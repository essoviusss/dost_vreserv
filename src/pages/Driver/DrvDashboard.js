import DriverHome from "./DriverHome";
import '../GlobalCSS/content.css';

export default function DrvDashboard() {
    return(
        <div>
            <DriverHome />
            <div className="main-content">
                <div>
                    <div>
                        <label>Scheduled Travels</label>
                    </div>

                    <div>
                        <label>Approved</label>
                    </div>

                    <div>
                        <label>Pending</label>
                    </div>
                </div>

            </div>
        </div>
    );
}