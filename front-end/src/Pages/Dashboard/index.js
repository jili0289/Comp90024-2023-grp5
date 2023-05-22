import "./Dashboard.css";

function Dashboard() {

  return (
    <div class="homepage">
      <div class="page-header-title">
        <h1 class="d-inline">COMP90024 Cluster and Cloud Computing</h1>
        <span style={{fontSize: '52px'}}>Project 2 Dashboard presented by Group 5</span>
      </div>
      <div class="page-header-description">
          Welcome to the dashboard of our CCC project!
          Here, we focus on three different scenarios by analysing:<br/>
          <h2><strong>Scenario 1</strong><br/></h2>
          The satisfaction level of different regions regarding 
          <strong> public transport </strong> by utilizing user counts, sentiment parameters from Twitter and Mastodon, as well as data from Sudo.
          <br/>
          <h2><strong>Scenario 2</strong><br/></h2>
          The proportion of the <strong> LGBTQ+ </strong>community and cohabitation rates in different regions through the analysis of Twitter and Mastodon users.
          <br/>
          <h2><strong>Scenario 3</strong><br/></h2>
          The total <strong> weekly rental </strong> sums of different regions based on the analysis of Twitter and Mastodon users and the data from Sudo.
          <br/><br/>
          Group members that contribute to this project are Zixuan Cheng, Jiayun Huang, Jiayuan Li, Yufeng Xie & Chang Yu.<br/><br/>
          <strong style={{fontSize: '32px'}}>Discover interesting stats about Aussies with us now!</strong>
          <div style={{ marginBottom: '100px' }}></div> {/* 添加空白区域 */}
      </div>
    </div>
  
  );
}

export default Dashboard;
