import { NextPage } from "next";
import { ImageUploader } from "../components/global/ImageUploader";
import { ProfilePhotoUploader } from "../components/global/ProfilePhotoUploader";
import HomeContainer from "../components/home/HomeContainer";

const Settings:NextPage = () => {
  
    return(
      <HomeContainer user={ null} onSearch={() => { }} >

        </HomeContainer>
    );
} 


export default Settings;