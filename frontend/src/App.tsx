import { useEffect, useState } from 'react';
import './App.css';

interface IApiResponse {
    data: {
        id: string;
        type: string;
        attributes: {
            title: string;
            body: {
                value: string;
            };
        };
    }[];
}

function App() {
    const [data, setData] = useState<IApiResponse | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(
                'http://localhost:56344/jsonapi/node/destination',
                { mode: 'cors' }
            );
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='App'>
            <h1>React + Drupal app</h1>
            {data &&
                data.data.map((item) => {
                    return (
                        <div key={item.id}>
                            <h2>{item.attributes.title}</h2>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item.attributes.body.value,
                                }}
                            />
                        </div>
                    );
                })}
        </div>
    );
}

export default App;
