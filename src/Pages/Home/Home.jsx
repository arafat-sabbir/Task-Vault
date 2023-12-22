import Banner from "./Banner/Banner";
import ContactUs from "./ContactUs/ContactUs";
import Footer from "./Footer/Footer";
import OurUser from "./OurUser/OurUser";
import UserReview from "./UserReview/UserReview";
import UserStats from "./UserStats/UserStats";


const Home = () => {
    return (
        <div>
                <Banner></Banner>
                <OurUser></OurUser>
                <UserStats></UserStats>
                <UserReview></UserReview>
                <ContactUs></ContactUs>
                <Footer></Footer>
        </div>
    );
};

export default Home;