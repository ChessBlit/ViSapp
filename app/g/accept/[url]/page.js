import AcceptClient from "./AcceptClient";


const page = async ({ params }) => {
	const url = (await params).url 
	return <AcceptClient url={url} />
};

export default page;
