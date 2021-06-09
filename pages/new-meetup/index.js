import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

function NewMeetupPage() {
    const router = useRouter();
    // console.log(entereData);
    async function addMeetupHandler(entereData) {
        // console.log(entereData);
        const response = await fetch('api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(entereData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log("Response data: " + data);
        router.replace('/');
    }
    return (
        <>
            <Head>
                <title>Add New Meetup</title>
                <meta
                    name='description'
                    content='Add your meetups and create networking!'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
}

export default NewMeetupPage;