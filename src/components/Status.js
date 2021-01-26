import styled from 'styled-components';

const Status = styled.div`
  padding: 5px 8px;
  border-radius: 10px;
`;

const Pending = styled(Status)`
  content: 'Pending';
  color: #fdb827;
  background: #fdb82733;
`;

const Received = styled(Status)`
  content: 'Received';
  color: #16c79a;
  background: #16c79a33;
`;

const StatusComponents = {
  Pending,
  Received,
};

export default StatusComponents;
