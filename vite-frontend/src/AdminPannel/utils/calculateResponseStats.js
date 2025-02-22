export const calculateResponseStats = (spaces) => {
    if (!spaces?.length) return {
      averageResponseRate: 0,
      avgResponsesPerSpace: 0,
      highestResponses: 0,
      highestResponseSpace: '',
      responseRateTrend: 0,
      distributionData: []
    };
  
    const totalResponses = spaces.reduce((sum, space) => sum + (space.responsesCount || 0), 0);
    const avgResponses = totalResponses / spaces.length;
    
    // Find space with highest responses
    const highestResponseSpace = spaces.reduce((prev, current) => 
      (current.responsesCount || 0) > (prev.responsesCount || 0) ? current : prev
    );
  
    // Calculate response distribution data
    const distributionData = spaces.map(space => ({
      name: space.spaceName,
      responses: space.responsesCount || 0
    })).sort((a, b) => b.responses - a.responses).slice(0, 5); // Top 5 spaces
  
    // Calculate response rate (percentage of spaces with responses)
    const spacesWithResponses = spaces.filter(space => (space.responsesCount || 0) > 0).length;
    const responseRate = (spacesWithResponses / spaces.length) * 100;
  
    return {
      averageResponseRate: Math.round(responseRate),
      avgResponsesPerSpace: Math.round(avgResponses * 10) / 10,
      highestResponses: highestResponseSpace.responsesCount || 0,
      highestResponseSpace: highestResponseSpace.spaceName,
      responseRateTrend: 0, // Calculate if you have historical data
      distributionData
    };
  };

export const calculateSpaceResponseRate = (space) => {
    if (!space || !space.responsesCount) return 0;
    
    // Calculate days since creation
    const daysSinceCreation = Math.max(1, 
      Math.floor((new Date() - new Date(space.createdAt)) / (1000 * 60 * 60 * 24))
    );
    
    // Responses per day
    return Math.round((space.responsesCount / daysSinceCreation) * 100) / 100;
  };