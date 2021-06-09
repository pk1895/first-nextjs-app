import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

function HomePage(props) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of highly active React Meetups'
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

export async function getStaticProps() {

    const client = await MongoClient.connect(
        'mongodb+srv://prasad:qWDZu87DMoRSXDsy@cluster0.fhxsb.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();
    const collection = db.collection('meetups');

    const meetups = await collection.find().toArray();
    return {
        props: {
            meetups: meetups.map((el) => ({
                title: el.title,
                address: el.address,
                description: el.description,
                image: el.image,
                id: el._id.toString()
            }))
        },
        revalidate: 1
    }
}

// export function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;