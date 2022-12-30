/**
 * Default data type for a leaderboard.
 */
export type Leaderboard = { name: any; points: any; userId: any; }

/**
 * Generates a list of `Leaderboard` objects.
 */
export const generateLeaderboard = (data: Leaderboard[]) => {
  let result: Leaderboard[] = [];

  data?.forEach((item: any) => {
    result.push({
      name: item.first_name,
      points: item.points,
      userId: item.ID
    })
  })

  return result;
}

export const determineHours = (points: number) => {
  return Math.round(Number(points) / 60)
}

export const determineBadgeFirstTask = (hours: number) => {
    return hours >= 0
}

export const determineBadgeFirstHour = (hours: number) => {
    return hours >= 1
}

export const determineBadgeOneDay = (hours: number) => {
    return hours >= 24
}

export const determineBadgeOneWeek = (hours: number) => {
    return hours >= 24*7
}

export const determineBadgeOneMonth = (hours: number) => {
    return hours >= 24*7*30
}

export const determineBadgeOneYear = (hours: number) => {
    return hours >= 24*7*30*364
}