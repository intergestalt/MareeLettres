import { OriginId } from 'maree-lettres-shared';

const RequestHelpers = {}

RequestHelpers.request_check_origin = function (req, res, next, origin_id = false) {
    if (!origin_id) {
        origin_id = req.params.origin_id;
    }
    // console.log(origin_id);

    if (!origin_id) {
        error_options = {
            code: 400,
            data: {
                error: 'id-required',
                reason: 'origin_id is required',
            },
        };
        JsonRoutes.sendResult(res, error_options);
    }

    // console.log(OriginId.verify(origin_id));

    if (!OriginId.verify(origin_id)) {
        error_options = {
            code: 401,
            data: {
                error: 'id-invalid',
                reason: 'origin_id is not valid',
            },
        };
        JsonRoutes.sendResult(res, error_options);
    }

    return origin_id;
};

export default RequestHelpers