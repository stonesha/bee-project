cube(`Locations`, {
  sql: `SELECT * FROM public.locations`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [locationId, name]
    }
  },
  
  dimensions: {
    locationId: {
      sql: `location_id`,
      type: `string`
    },
    
    location: {
      sql: `location`,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
    },
    
    type: {
      sql: `type`,
      type: `string`
    },
    
    info: {
      sql: `info`,
      type: `string`
    }
  }
});
