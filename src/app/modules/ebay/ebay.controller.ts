import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ebayService } from './ebay.service';

const getProducts = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ebayService.getProducts(query);
  sendResponse(res, {
    data: result,
    message: 'Product fetched successfully',
    statusCode: 200,
    success: true,
  });
});

export const ebayController = {
  getProducts,
};
