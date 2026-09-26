import React from 'react';
import Carousel from './Carousel';
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineShieldExclamation,
  HiOutlineBookmark,
} from 'react-icons/hi2';

export const DashboardStats = ({ statsData }) => {
  // Real MongoDB stats data mapped cleanly
  const dashboardStats = [
    {
      id: 'jobs-analysed',
      title: 'Jobs Analysed',
      value: statsData?.jobsAnalysed ?? 0,
      description: 'Job postings reviewed',
      icon: <HiOutlineBriefcase className="w-5 h-5 text-[#B8A1FF]" />,
    },
    {
      id: 'reports-submitted',
      title: 'Reports Submitted',
      value: statsData?.reportsSubmitted ?? 0,
      description: 'Reports submitted by you',
      icon: <HiOutlineDocumentText className="w-5 h-5 text-[#D8CCFF]" />,
    },
    {
      id: 'high-risk-jobs',
      title: 'High Risk Jobs',
      value: statsData?.highRiskJobs ?? 0,
      description: 'Jobs flagged as high risk',
      icon: <HiOutlineShieldExclamation className="w-5 h-5 text-[#FB7185]" />,
    },
    {
      id: 'saved-jobs',
      title: 'Saved Jobs',
      value: statsData?.savedJobs ?? 0,
      description: 'Job postings saved',
      icon: <HiOutlineBookmark className="w-5 h-5 text-[#B8A1FF]" />,
    },
  ];

  return (
    <div className="w-full">
      <Carousel
        items={dashboardStats}
        baseWidth={260}
        autoplay={false}
        loop={true}
        round={false}
      />
    </div>
  );
};

export default DashboardStats;
