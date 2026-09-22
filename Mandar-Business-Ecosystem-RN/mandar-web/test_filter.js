const businesses = [
  {
    business_name: 'Jain Trademart',
    industries: [ 'Event Management', 'Automobile', 'Agriculture' ]
  }
];
const industryName = "Event Management";
const filteredBusinesses = businesses ? businesses.filter(b => b.industries && b.industries.includes(industryName)) : [];
console.log(filteredBusinesses.length);
