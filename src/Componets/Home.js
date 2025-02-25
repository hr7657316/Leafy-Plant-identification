
import './Home.css';
import plantsIcon from '../Images/plants.png';
import healthIcon from '../Images/health.png';
import mlIcon from '../Images/ml.png';
import howItWorksIcon from '../Images/how_it_works.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
        <div className="container py-4">
            <div style={{marginTop: "80px"}}>
                <div className="show-for-medium"></div>
                
                <div className="text-center">
                    <div className="logo-container">
                        <div className="logo">
                            <img src={howItWorksIcon} alt="Logo" className="logo-icon" />
                        </div>
                        <h1>Identify Plants in Seconds</h1>
                    </div>
                </div>

                <p className="text-center header-description">
                    Take multiple photos of your plant, upload them and let us work our magic. This web demo
                    allows you to identify up to 10 plants per month for free.
                </p>

                <div style={{height: "1rem"}}></div>
                <hr />

                <div className="info-box">
                    <div className="section-icon">
                        <img src={plantsIcon} alt="Plants" />
                    </div>
                    <h2>Plenty of Plants</h2>
                    <p>
                        Leafy can accurately identify more than 35,000 taxa of plants, mushrooms and lichen from
                        around the world. We give you the common name, a short description and the classification
                        of your plant in addition to the scientific (Latin) name.
                    </p>
                </div>

                <div className="info-box">
                    <div className="section-icon">
                        <img src={healthIcon} alt="Plant Health" />
                    </div>
                    <h2>Plant Diseases</h2>
                    <p>
                        Is your plant sick? Is it due to pests, fungal disease, or simply overwatered? Plant.health
                        feature can tell the difference! Our model detects 90 different diseases. Just click on the icon
                        of the sick plant after the identification.
                    </p>
                </div>

                <div className="info-box">
                    <div className="section-icon">
                        <img src={mlIcon} alt="Machine Learning" />
                    </div>
                    <h2>Power of Machine Learning</h2>
                    <p>
                        We use cutting-edge methods of machine learning (aka artificial intelligence) and train
                        custom deep convolutional neural networks to ensure the best possible results. We estimate
                        that we get the plant name right 90% of the time.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;