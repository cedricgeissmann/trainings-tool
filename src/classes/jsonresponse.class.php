<?php

class JSONResponse extends ArrayResponse{

	public function get_response(){
		return json_encode($this->response);
	}

}


?>
