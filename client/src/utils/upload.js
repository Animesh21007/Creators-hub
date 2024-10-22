import axios from 'axios';

const upload = async (imgfile) => {
	const formData = new FormData();
	formData.append('file', imgfile);
	formData.append('upload_preset', 'Fiverr');
	try {
		const res = await axios.post(
			'https://api.cloudinary.com/v1_1/dagb2yluc/image/upload',
			formData
		);
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default upload;
