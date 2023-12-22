import Banner from "./Banner/Banner";
import Footer from "./Footer/Footer";
import OurUser from "./OurUser/OurUser";
import UserReview from "./UserReview/UserReview";


const Home = () => {
    return (
        <div>
                <Banner></Banner>
                <OurUser></OurUser>
                <UserReview></UserReview>
                <Footer></Footer>
        </div>
    );
};

export default Home;