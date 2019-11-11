import React from 'react';
import ReactDOM from 'react-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Provider } from 'react-redux';
import store from './modules/store';
import styled from 'styled-components';
import TopNaviContainer from './containers/TopNaviContainer';

import '../scss/base.scss';
import Icon from './components/common/Icon/Icon';
import Button from './components/common/Button/Button';
import ButtonGroup from './components/common/Button/ButtonGroup';
import Container from './components/common/Layout/Container';
import Row from './components/common/Layout/Row';
import Col from './components/common/Layout/Col';
import Badge from './components/common/Badge/Badge';
import Spinner from './components/common/Spinner/Spinner';
import Table from './components/common/Table/Table';
import Pagination from './components/common/Pagination/Pagination';
import PaginationItem from './components/common/Pagination/PaginationItem';
import PaginationLink from './components/common/Pagination/PaginationLink';
import Input from './components/common/Form/Input';

const GuideWrap = styled.div`
  padding-top: 24px;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

const GuideNavi = styled.ul`
  float: left;
  width: 150px;
  padding: 12px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  box-sizing: border-box;
  li {
    border-top: 1px solid black;
    &:first-child {
      border-top: 0;
    }
  }
`;

const GuideContent = styled.div`
  padding-left: 180px;
  pre {
    box-sizing: border-box;
  }
`;

const GuideBlock = styled.div`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 6px;
`;

const GuideH1 = styled.h1`
  padding: 16px 0;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: -1px;
  & + h2 {
    padding-top: 0;
  }
`;

const GuideH2 = styled.h2`
  padding: 16px 0;
  font-size: 24px;
  font-weight: normal;
  letter-spacing: -1px;
`;

const Guide = () => {
  return (
    <Provider store={store}>
      {/* 상단 Navi */}
      <TopNaviContainer></TopNaviContainer>
      <GuideWrap>
        <GuideNavi>
          <li>
            <a href="#Icon">Icon</a>
          </li>
          <li>
            <a href="#Button">Button</a>
          </li>
          <li>
            <a href="#Layout">Layout</a>
          </li>
          <li>
            <a href="#Badge">Badge</a>
          </li>
          <li>
            <a href="#Spinner">Spinner</a>
          </li>
          <li>
            <a href="#Table">Table</a>
          </li>
          <li>
            <a href="#Pagination">Pagination</a>
          </li>
          <li>
            <a href="#Input">Input</a>
          </li>
        </GuideNavi>
        <GuideContent>
          <GuideH1 id="Icon">Icon</GuideH1>
          <GuideBlock>
            <Icon iconName="cake" blind="케이크 아이콘"></Icon>
            <Icon iconName="biscuit" blind="비스킷 아이콘"></Icon>
            <Icon iconName="soda" blind="소다 아이콘"></Icon>
            <Icon iconName="tea" blind="티 아이콘"></Icon>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH1 id="Button">Button</GuideH1>
          <GuideBlock>
            <ButtonGroup vertical>
              <Button color="primary">primary</Button>
              <Button color="secondary">secondary</Button>
            </ButtonGroup>
            <Button color="primary">primary</Button>
            <Button color="secondary">secondary</Button>
            <Button color="success">success</Button>
            <Button color="info">info</Button>
            <Button color="warning">warning</Button>
            <Button color="danger">danger</Button>
            <Button color="link">link</Button>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Outline Button</GuideH2>
          <GuideBlock>
            <Button outline color="primary">
              primary
            </Button>
            <Button outline color="secondary">
              secondary
            </Button>
            <Button outline color="success">
              success
            </Button>
            <Button outline color="info">
              info
            </Button>
            <Button outline color="warning">
              warning
            </Button>
            <Button outline color="danger">
              danger
            </Button>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Size</GuideH2>
          <GuideBlock>
            <Button color="primary" size="lg">
              Large Button
            </Button>
            <Button color="secondary" size="lg">
              Large Button
            </Button>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideBlock>
            <Button color="primary" size="sm">
              Small Button
            </Button>
            <Button color="secondary" size="sm">
              Small Button
            </Button>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideBlock>
            <Button color="primary" size="lg" block>
              Block level button
            </Button>
            <Button color="secondary" size="lg" block>
              Block level button
            </Button>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Active</GuideH2>
          <GuideBlock>
            <Button color="primary" size="lg" active>
              Primary link
            </Button>
            <Button color="secondary" size="lg" active>
              Link
            </Button>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Disabled</GuideH2>
          <GuideBlock>
            <Button color="primary" size="lg" disabled>
              Primary button
            </Button>
            <Button color="secondary" size="lg" disabled>
              Button
            </Button>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Close</GuideH2>
          <GuideBlock>
            <Button close />
            <Button close aria-label="cancel">
              <span aria-hidden>&ndash;</span>
            </Button>
            <Button close>
              <Icon iconName="cake" blind="케이크 아이콘"></Icon>
            </Button>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH1 id="Layout">Layout</GuideH1>
          <GuideBlock>
            <Container>
              <Row>
                <Col>.col</Col>
              </Row>
              <Row>
                <Col>.col</Col>
                <Col>.col</Col>
                <Col>.col</Col>
                <Col>.col</Col>
              </Row>
              <Row>
                <Col xs="3">.col-3</Col>
                <Col xs="auto">.col-auto - variable width content</Col>
                <Col xs="3">.col-3</Col>
              </Row>
              <Row>
                <Col xs="6">.col-6</Col>
                <Col xs="6">.col-6</Col>
              </Row>
              <Row>
                <Col xs="6" sm="4">
                  .col-6 .col-sm-4
                </Col>
                <Col xs="6" sm="4">
                  .col-6 .col-sm-4
                </Col>
                <Col sm="4">.col-sm-4</Col>
              </Row>
              <Row>
                <Col sm={{ size: 6, order: 2, offset: 1 }}>
                  .col-sm-6 .order-sm-2 .offset-sm-1
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  .col-sm-12 .col-md-6 .offset-md-3
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                  .col-sm-auto .offset-sm-1
                </Col>
                <Col sm={{ size: 'auto', offset: 1 }}>
                  .col-sm-auto .offset-sm-1
                </Col>
              </Row>
            </Container>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH1 id="Badge">Badge</GuideH1>
          <GuideBlock>
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="danger">Danger</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="light">Light</Badge>
            <Badge color="dark">Dark</Badge>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>In the Heading</GuideH2>
          <GuideBlock>
            <h1>
              Heading <Badge color="secondary">New</Badge>
            </h1>
            <h2>
              Heading <Badge color="secondary">New</Badge>
            </h2>
            <h3>
              Heading <Badge color="secondary">New</Badge>
            </h3>
            <h4>
              Heading <Badge color="secondary">New</Badge>
            </h4>
            <h5>
              Heading <Badge color="secondary">New</Badge>
            </h5>
            <h6>
              Heading <Badge color="secondary">New</Badge>
            </h6>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>In the Button</GuideH2>
          <GuideBlock>
            <Button color="primary" outline>
              Notifications <Badge color="secondary">4</Badge>
            </Button>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Pills</GuideH2>
          <GuideBlock>
            <Badge color="primary" pill>
              Primary
            </Badge>
            <Badge color="secondary" pill>
              Secondary
            </Badge>
            <Badge color="success" pill>
              Success
            </Badge>
            <Badge color="danger" pill>
              Danger
            </Badge>
            <Badge color="warning" pill>
              Warning
            </Badge>
            <Badge color="info" pill>
              Info
            </Badge>
            <Badge color="light" pill>
              Light
            </Badge>
            <Badge color="dark" pill>
              Dark
            </Badge>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Links</GuideH2>
          <GuideBlock>
            <Badge href="#" color="primary">
              Primary
            </Badge>
            <Badge href="#" color="secondary">
              Secondary
            </Badge>
            <Badge href="#" color="success">
              Success
            </Badge>
            <Badge href="#" color="danger">
              Danger
            </Badge>
            <Badge href="#" color="warning">
              Warning
            </Badge>
            <Badge href="#" color="info">
              Info
            </Badge>
            <Badge href="#" color="light">
              Light
            </Badge>
            <Badge href="#" color="dark">
              Dark
            </Badge>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH1 id="Spinner">Spinner</GuideH1>
          <GuideBlock>
            <Spinner color="primary" />
            <Spinner color="secondary" />
            <Spinner color="success" />
            <Spinner color="danger" />
            <Spinner color="warning" />
            <Spinner color="info" />
            <Spinner color="light" />
            <Spinner color="dark" />
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Growing Spinner</GuideH2>
          <GuideBlock>
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <Spinner type="grow" color="light" />
            <Spinner type="grow" color="dark" />
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Size</GuideH2>
          <GuideBlock>
            <Spinner size="sm" color="primary" />
            <Spinner size="sm" color="secondary" />
            <Spinner style={{ width: '3rem', height: '3rem' }} />
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH1 id="Table">Table</GuideH1>
          <GuideBlock>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Dark table</GuideH2>
          <GuideBlock>
            <Table dark>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Striped rows</GuideH2>
          <GuideBlock>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Bordered table</GuideH2>
          <GuideBlock>
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Borderless table</GuideH2>
          <GuideBlock>
            <Table borderless>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Hoverable rows</GuideH2>
          <GuideBlock>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Small table</GuideH2>
          <GuideBlock>
            <Table size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Responsive table</GuideH2>
          <GuideBlock>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
              </tbody>
            </Table>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH1 id="Pagination">Pagination</GuideH1>
          <GuideBlock>
            <Pagination aria-label="Page navigation example">
              <PaginationItem>
                <PaginationLink first href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last href="#" />
              </PaginationItem>
            </Pagination>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Disabled and active states</GuideH2>
          <GuideBlock>
            <Pagination aria-label="Page navigation example">
              <PaginationItem disabled>
                <PaginationLink first href="#" />
              </PaginationItem>
              <PaginationItem disabled>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last href="#" />
              </PaginationItem>
            </Pagination>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH2>Sizing</GuideH2>
          <GuideBlock>
            <Pagination size="lg" aria-label="Page navigation example">
              <PaginationItem>
                <PaginationLink first href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last href="#" />
              </PaginationItem>
            </Pagination>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideBlock>
            <Pagination size="sm" aria-label="Page navigation example">
              <PaginationItem>
                <PaginationLink first href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last href="#" />
              </PaginationItem>
            </Pagination>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
          <GuideH1 id="Input">Input</GuideH1>
          <GuideBlock>
            <Input type="select" multiple>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </GuideBlock>
          <SyntaxHighlighter language="jsx" style={atomDark}>
            {``}
          </SyntaxHighlighter>
        </GuideContent>
      </GuideWrap>
    </Provider>
  );
};

ReactDOM.render(<Guide />, document.getElementById('root'));
