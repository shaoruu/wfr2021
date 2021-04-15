import { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import PledgeTable from '../../components/PledgeTable';
import ReceivedTable from '../../components/ReceivedTable';
import StatusBar from '../../components/StatusBar';
import { useAuth } from '../../contexts/authContext';
import {
  ALL_TSHIRTS_QUERY,
  USER_EMAILS_QUERY,
  USER_QUERY,
} from '../../graphql/queries';

const Wrapper = styled.div``;

const SpecificUsers = () => {
  const [selectedEmail, setSelectedEmail] = useState('');

  const { loading, data: usersData } = useQuery(USER_EMAILS_QUERY);
  const { loading: loading2, data: userData, refetch } = useQuery(USER_QUERY, {
    variables: { email: selectedEmail },
  });

  useEffect(() => {
    refetch();
  }, [refetch, selectedEmail]);

  if (loading || loading2) {
    return <div>loading...</div>;
  }

  const { users } = usersData;

  let userEle;
  if (userData.user) {
    const {
      user: {
        fullName,
        eventWide,
        pledges,
        received,
        tShirtOrder: { sCount, mCount, lCount },
      },
    } = userData;

    userEle = (
      <div>
        <h1 style={{ margin: 20 }}>{fullName}</h1>
        <div style={{ margin: 20 }}>
          <h2>TShirt Order</h2>
          <p>
            S: {sCount} m: {mCount} L: {lCount}
          </p>
        </div>
        <div style={{ margin: '20px 0' }}>
          <p>the pledges combined is not calculated</p>
          <StatusBar pledges={pledges} received={received} allPledges={[]} />
        </div>
        <div style={{ display: 'flex' }}>
          <PledgeTable
            pledges={pledges}
            toggleForm={() => {}}
            setToDelete={() => {}}
          />
          <ReceivedTable received={[...received, ...eventWide]} />
        </div>
        <div>
          <h3>list of emails of outsiders related to this person</h3>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {received
                .filter(({ outsiderName }) => !!outsiderName)
                .map(({ outsiderName, outsiderEmail }, i) => (
                  <tr key={'mdafasfd' + i}>
                    <td>{outsiderName}</td>
                    <td>{outsiderEmail}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <select
        placeholder="select a user"
        name="user"
        value={selectedEmail}
        onChange={({ target: { value } }) => setSelectedEmail(value)}
      >
        {users.map(({ email }, i) => (
          <option key={'option2' + i}>{email}</option>
        ))}
      </select>
      {userData.user && userEle}
    </div>
  );
};

const AllTShirts = () => {
  const { loading, data } = useQuery(ALL_TSHIRTS_QUERY);

  if (loading) return <p>loading</p>;

  return (
    <div style={{ padding: 30 }}>
      <table style={{ border: '1px solid black' }}>
        <thead style={{ border: '1px solid black' }}>
          <tr style={{ border: '1px solid black' }}>
            <th style={{ border: '1px solid black' }}>Name</th>
            <th style={{ border: '1px solid black' }}>Email</th>
            <th style={{ border: '1px solid black' }}>ID</th>
            <th style={{ border: '1px solid black' }}>Small</th>
            <th style={{ border: '1px solid black' }}>Medium</th>
            <th style={{ border: '1px solid black' }}>Large</th>
          </tr>
        </thead>
        <tbody style={{ border: '1px solid black' }}>
          {data.tShirtOrders.map(
            (
              { lCount, mCount, sCount, buyer: { fullName, email, schoolId } },
              i,
            ) => (
              <tr key={'goddam' + i} style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}>{fullName}</td>
                <td style={{ border: '1px solid black' }}>{email}</td>
                <td style={{ border: '1px solid black' }}>{schoolId}</td>
                <td style={{ border: '1px solid black' }}>{sCount}</td>
                <td style={{ border: '1px solid black' }}>{mCount}</td>
                <td style={{ border: '1px solid black' }}>{lCount}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

const AdminUsers = () => {
  const { data } = useAuth();

  if (!data?.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <SpecificUsers />
      <AllTShirts />
    </Wrapper>
  );
};

export default AdminUsers;