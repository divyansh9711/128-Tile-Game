import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import '../styles/Footer.css'
const Footer = () => {
    return (
        <div className="footer">
            <span>Made by Divyansh Singh</span>
            <LocalPhoneIcon></LocalPhoneIcon>
            <span>+91 8003695517</span>
            <EmailIcon></EmailIcon>
            <span>divy97@gmail.com</span>
            <LinkedInIcon></LinkedInIcon>
            <a href="https://www.linkedin.com/in/divyansh-singh-03777371/"  target="_blank">Divyansh Singh</a>
            <GitHubIcon></GitHubIcon>
            <a href="https://github.com/divyansh9711"  target="_blank">divyansh9711</a>
        </div>
    )
}

export default Footer
