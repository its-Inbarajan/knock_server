import { Response, Request } from "express";
import { IlistModel, LISTSMODELS } from "../models/listsModels";
import { IApiResponse } from "../services/Responses";
import cloudinary from "../configs/cloudinary";

export const createLists = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    benefits,
    additional_details,
    category,
  }: IlistModel = req.body;
  const files = req.files as Express.Multer.File[];

  try {
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "interview",
          resource_type: "image",
        });
        return {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      })
    );

    const response = await LISTSMODELS.create({
      name,
      description,
      conver_photos: uploadResults,
      price,
      benefits,
      additional_details,
      category,
    });

    if (!response) {
      const apiRes: IApiResponse<null> = {
        message: "Something Went wrong, please try again!",
        status: false,
        statusCode: 400,
      };
      res.status(apiRes.statusCode).json(apiRes);
      return;
    }

    const apiRes: IApiResponse<IlistModel> = {
      message: "List created successfully!",
      status: true,
      statusCode: 201,
      response: response,
    };

    res.status(apiRes.statusCode).json(apiRes);
  } catch (error: unknown) {
    const apiRes: IApiResponse<null> = {
      message: "Internal server error!",
      status: false,
      statusCode: 500,
      error: (error as Error).message || String(error),
    };

    res.status(apiRes.statusCode).json(apiRes);
  }
};

export const getAllLists = async (req: Request, res: Response) => {
  try {
    const response = await LISTSMODELS.find().sort({ createdAt: -1 });

    const apiRes: IApiResponse<IlistModel[]> = {
      message: "Fetching lists successfully!",
      status: true,
      statusCode: 200,
      response: response,
    };

    res.status(apiRes.statusCode).json(apiRes);
  } catch (error: unknown) {
    const apiRes: IApiResponse<null> = {
      message: "Internal server error!",
      status: false,
      statusCode: 500,
      error: (error as Error).message || String(error),
    };

    res.status(apiRes.statusCode).json(apiRes);
  }
};

export const getListById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const find = await LISTSMODELS.findById(id);

    if (!find) {
      const apiRes: IApiResponse<null> = {
        message: "List not found!",
        status: false,
        statusCode: 400,
      };

      res.status(apiRes.statusCode).json(apiRes);
      return;
    }

    const apiRes: IApiResponse<IlistModel> = {
      message: "Find list Successfully!",
      status: true,
      statusCode: 200,
      response: find,
    };

    res.status(apiRes.statusCode).json(apiRes);
  } catch (error: unknown) {
    const apiRes: IApiResponse<null> = {
      message: "Internal server error!",
      status: false,
      statusCode: 500,
      error: (error as Error).message || String(error),
    };

    res.status(apiRes.statusCode).json(apiRes);
  }
};
