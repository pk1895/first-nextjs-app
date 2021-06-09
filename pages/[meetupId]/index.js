import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

function MeetupDetails(props) {
    // console.log(props.meetupData);
    // debugger
    const { id, title, address, description, image } = props.selectedData;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name='description'
                    content={description}
                />
            </Head>
            <MeetupDetail
                id={id}
                image={image}
                title={title}
                address={address}
                description={description} />
        </>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://prasad:qWDZu87DMoRSXDsy@cluster0.fhxsb.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();
    const collection = db.collection('meetups');

    const meetups = await collection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        fallback: false,
        paths: meetups.map(el =>
            ({ params: { meetupId: el._id.toString() } }))

    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    console.log(meetupId);

    const client = await MongoClient.connect(
        'mongodb+srv://prasad:qWDZu87DMoRSXDsy@cluster0.fhxsb.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();
    const collection = db.collection('meetups');

    const meetupSelected = await collection.findOne({ _id: ObjectId(meetupId) });
    client.close();

    return {
        props: {
            selectedData: {
                id: meetupSelected._id.toString(),
                title: meetupSelected.title,
                address: meetupSelected.address,
                description: meetupSelected.description,
                image: meetupSelected.image
            }
        }
    }

}

export default MeetupDetails;