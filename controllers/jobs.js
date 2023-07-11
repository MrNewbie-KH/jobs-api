const jobModel = require("../models/Job");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
// 1
// POST as we send data as position and company
const createJob = async (req, res) => {
  const createdBy = req.user.userId;
  req.body.createdBy = createdBy;
  const job = await jobModel.create(req.body);
  res.status(StatusCodes.OK).json(job);
};
// 2
// GET as we need to retrieva all the data
const getAllJobs = async (req, res) => {
  const jobs = await jobModel.find({ createdBy: req.user.userId }); //user who has current token only
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
// 3
// retrieve the data with the _id provided
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  // id cuz it is written in routers as :id
  // userId from createdby someuser
  const job = await jobModel.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError("No job with the given ID : " + jobId);
  }
  res.status(StatusCodes.OK).json({ job });
};
// 4
// update one job
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    params: { id: jobId },
    user: { userId },
  } = req;
  if (!company || !position) {
    throw new BadRequestError("Both company and position must be provided");
  }
  const job = await jobModel.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError("No job with the provided ID");
  }
  res.status(StatusCodes.OK).json({ job });
};
// 5
// delete job
const deleteJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  const job = await jobModel.findByIdAndDelete({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError("No job with the provided ID");
  }
  res.status(StatusCodes.OK).send("Job deleted successfully");
};
module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
